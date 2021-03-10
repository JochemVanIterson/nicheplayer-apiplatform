<?php

namespace App\Tests\Api;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Greeting;

class GreetingsTest extends ApiTestCase
{
    public function testCreateGreeting()
    {
        $client = self::createClient();

        $user = new User();
        $user->setEmail('test@example.com');
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
                'email' => 'test@example.com',
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
