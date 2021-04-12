<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Helper\ProgressBar;

use App\Entity\MediaObject;
use App\MediaParsers\ImageParser;
use App\MediaParsers\AudioParser;

class UpdateMetaCommand extends Command
{
    protected static $defaultName = 'app:update-meta';
    protected static $defaultDescription = 'Update metadata fields of your uploaded media';

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();
        $this->em = $em;
    }
    
    protected function configure()
    {
        $this
            ->setDescription(self::$defaultDescription)
            ->addArgument('id', InputArgument::OPTIONAL, 'ID of the media object')
            ->addOption('type', 't', InputOption::VALUE_REQUIRED, 'Type of media to be refreshed')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $id = $input->getArgument('id');
        $type = $input->getOption('type');

        $io->note(sprintf('Updating media with type %s', $type !== null ? $type : 'all'));
        if ($id) $io->note(sprintf('Updating media with id %s', $id));

        $query = [];
        if ($type) $query["type"] = $type;
        if ($id)   $query["id"]   = $id ;

        $mediaObjects = $this->em
            ->getRepository(MediaObject::class)
            ->findBy($query);

        $table = new Table($output);
        $table->setHeaders(['id', 'type', 'access', 'filename']);
        foreach ($mediaObjects as $key => $e) {
            $table->addRow([
                $e->getID(),
                $e->getType(),
                $e->getAccess(),
                $e->getFileName()
            ]);
        }
        $table->render();
        $output->writeln('');

        $helper = $this->getHelper('question');
        $question = new ConfirmationQuestion('Update metadata from these objects?', true);

        if (!$helper->ask($input, $output, $question)) {
            $output->writeln('');
            $io->error('Execution halted');
            return Command::SUCCESS;
        }

        $output->writeln('');
        $progressBar = new ProgressBar($output, count($mediaObjects));
        $progressBar->start();

        foreach ($mediaObjects as $key => $media) {
            $progressBar->advance();
            $mediaParser = null;
            $type = $media->getType();
            $file = $media->file;

            $media->setSize(filesize($file->getPathname()));

            if($type == "image") {
                $mediaParser = new ImageParser($file);
            } else if($type == "audio") {
                $mediaParser = new AudioParser($file);
            }
            if($mediaParser) $media->setMeta($mediaParser->generateMetadata());
        }
        $this->em->flush();

        $progressBar->finish();
        $output->writeln('');
        $output->writeln('');

        $io->success('Update success');

        return Command::SUCCESS;
    }
}
