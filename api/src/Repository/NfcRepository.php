<?php

namespace App\Repository;

use App\Entity\Nfc;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Nfc|null find($id, $lockMode = null, $lockVersion = null)
 * @method Nfc|null findOneBy(array $criteria, array $orderBy = null)
 * @method Nfc[]    findAll()
 * @method Nfc[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NfcRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Nfc::class);
    }

    // /**
    //  * @return Nfc[] Returns an array of Nfc objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('n.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Nfc
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
