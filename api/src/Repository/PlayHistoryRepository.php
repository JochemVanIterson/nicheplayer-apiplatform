<?php

namespace App\Repository;

use App\Entity\PlayHistory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PlayHistory|null find($id, $lockMode = null, $lockVersion = null)
 * @method PlayHistory|null findOneBy(array $criteria, array $orderBy = null)
 * @method PlayHistory[]    findAll()
 * @method PlayHistory[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlayHistoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PlayHistory::class);
    }

    // /**
    //  * @return PlayHistory[] Returns an array of PlayHistory objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PlayHistory
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
