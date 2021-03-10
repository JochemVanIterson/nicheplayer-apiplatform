<?php

namespace App\Tests\Api;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use App\Entity\Greeting;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class GreetingsTest extends ApiTestCase
{
    use ReloadDatabaseTrait;

    public function testCreateGreeting()
    {
        $client = self::createClient();

        $user = new User();
        $user->setEmail('test@example.com');
        $user->setUsername('test');
        $user->setPassword(
            self::$container->get('security.password_encoder')->encodePassword($user, '$3CR3T')
        );

        $manager = self::$container->get('doctrine')->getManager();
        $manager->persist($user);
        $manager->flush();

        // retrieve a token
        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'username' => 'test',
                'password' => '$3CR3T',
            ],
        ]);

        $json = $response->toArray();
        $this->assertResponseIsSuccessful();
        $this->assertArrayHasKey('token', $json);

        $response = $client->request('POST', '/greetings', [
            'auth_bearer' => $json['token'],
            'json' => [
                'name' => 'Kévin',
            ]
        ]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertJsonContains([
            '@context' => '/contexts/Greeting',
            '@type' => 'Greeting',
            'name' => 'Kévin',
        ]);
    }
}
