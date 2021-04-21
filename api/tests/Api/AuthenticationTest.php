<?php
// tests/AuthenticationTest.php

namespace App\Tests;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class AuthenticationTest extends ApiTestCase
{
    use ReloadDatabaseTrait;

    public function testLogin(): void
    {
        $client = self::createClient();

        // Create new User
        $user = new User();
        $user->setEmail('test@example.com');
        $user->setUsername('test');
        $user->setFirstname('Test');
        $user->setLastname('Test');
        $user->setRoles(["ROLE_ADMIN"]);
        $user->setPassword(
            self::$container->get('security.password_encoder')->encodePassword($user, 'test')
        );

        $manager = self::$container->get('doctrine')->getManager();
        $manager->persist($user);
        $manager->flush();

        // Test not authorized
        $client->request('GET', '/api/albums');
        $this->assertResponseStatusCodeSame(401);

        // retrieve a token
        $response = $client->request('POST', '/api/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'username' => 'test',
                'password' => 'test',
            ],
        ]);

        $json = $response->toArray();
        $this->assertResponseIsSuccessful();
        $this->assertArrayHasKey('token', $json);
        $this->assertArrayHasKey('refresh_token', $json);

        // test authorized
        $client->request('GET', '/api/albums', ['auth_bearer' => $json['token']]);
        $this->assertResponseIsSuccessful();
    }
}