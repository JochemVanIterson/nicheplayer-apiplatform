<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use App\Entity\Source;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $config = [
            "path"=> "%kernel.project_dir%/public/media/"
        ];

        $source = new Source();
        $source->setID(1);
        $source->setName("local");
        $source->setType("LOCAL");
        $source->setConfig($config);

        $manager->persist($source);

        $manager->flush();
    }
}
