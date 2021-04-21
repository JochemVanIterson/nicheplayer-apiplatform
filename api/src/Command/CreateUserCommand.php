<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Question\ChoiceQuestion;
use Symfony\Component\Console\Question\ConfirmationQuestion;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use App\Repository\UserRepository;
use App\Entity\User;


class CreateUserCommand extends Command
{
    protected static $defaultName = 'user:create';
    protected static $defaultDescription = 'Create a new user';

    private $em;
    private $userRepository;
    private $encoder;

    public function __construct(EntityManagerInterface $em, UserRepository $userRepository, UserPasswordEncoderInterface $encoder)
    {
        parent::__construct();
        $this->em = $em;
        $this->userRepository = $userRepository;
        $this->encoder = $encoder;
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
        $helper = $this->getHelper('question');
        $io = new SymfonyStyle($input, $output);

        $io->title('Create a new User');
        
        $username = $helper->ask($input, $output, new Question('Username: '));

        if ($this->userRepository->findOneBy(['username' => $username])) {
			$output->writeln('<error>The user "' . $username . '" already exists.</error>');
			return 1;
		}

        $email = $helper->ask($input, $output, new Question('Email address: '));
        $firstname = $helper->ask($input, $output, new Question('First name: '));
        $lastname = $helper->ask($input, $output, new Question('Last name: '));

        $question = new Question('Enter password: ');
        $question->setHidden(true);
        $password = $helper->ask($input, $output, $question);

        $question = new Question('Confirm password: ');
        $question->setHidden(true);
        $confirm = $helper->ask($input, $output, $question);

        if ($password !== $confirm) {
            $output->writeln("<error>Passwords did not match!</error>");
            return 1;
        }

        $question = new ConfirmationQuestion('Admin user?: ', false);
        $admin = $helper->ask($input, $output, $question);
        
        $output->writeln('');
        $io->note('Creating user...');
        
        $user = new User();
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setFirstname($firstname);
        $user->setLastname($lastname);
        $user->setRoles($admin?["ROLE_ADMIN"]:[]);
        $user->setPassword(
            $this->encoder->encodePassword($user, $password)
        );
        $io->note('Inserting...');
        $this->em->persist($user);
        $this->em->flush();

        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return Command::SUCCESS;
    }
}
