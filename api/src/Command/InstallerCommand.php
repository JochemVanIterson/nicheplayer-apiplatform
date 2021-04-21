<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

use App\Repository\SourceRepository;
use App\Entity\Source;

class InstallerCommand extends Command
{
    protected static $defaultName = 'install';
    protected static $defaultDescription = 'Initialize the system';

    private $em;
    private $sourceRepository;

    public function __construct(EntityManagerInterface $em, SourceRepository $sourceRepository)
    {
        parent::__construct();
        $this->em = $em;
        $this->sourceRepository = $sourceRepository;
    }

    protected function configure()
    {
        $this
            ->setDescription(self::$defaultDescription)
            // ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            // ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $emptyInput = new ArrayInput([]);

        $io->title('Initialize the NichePlayer system');

        $output->writeln("This script initializes all the necessary variables and systems. This includes the creation of an administrator user.");

        $createUserCommand = $this->getApplication()->find('user:create');
        $returnCode = $createUserCommand->run($emptyInput, $output);


        $io->title('Initializing database');
        $source = new Source();
        $source->setID(1);
        $source->setName("local");
        $source->setType("LOCAL");
        $source->setConfig(["path"=> "%kernel.project_dir%/public/media/"]);
        $this->em->persist($source);
        $this->em->flush();

        $io->success('Install complete');

        return Command::SUCCESS;
    }
}
