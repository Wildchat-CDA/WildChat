import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Type } from './type.entity';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  maxSlot: number;
  // Nombre maximum d'utilisateurs pouvant rejoindre le canal

  @Column('simple-array')
  visibleToRoles: string[];
  // Liste des rôles qui peuvent voir le canal dans la liste des canaux
  // Permet de créer des canaux visibles uniquement pour certains groupes (ex: enseignants, groupes de projet spécifiques)

  @Column('simple-array')
  accessibleToRoles: string[];
  // Liste des rôles qui peuvent accéder au contenu du canal
  // Contrôle qui peut lire les messages ou participer aux activités du canal

  @Column('simple-array')
  writeableByRoles: string[];
  // Liste des rôles autorisés à écrire des messages dans le canal
  // Utile pour créer des canaux en lecture seule pour les annonces ou limiter qui peut poster du contenu

  @Column('simple-array')
  vocalAllowedRoles: string[];
  // Liste des rôles autorisés à utiliser les fonctionnalités vocales
  // Contrôle qui peut parler dans les canaux vocaux ou les sessions en direct

  @Column('simple-array')
  videoAllowedRoles: string[];
  // Liste des rôles autorisés à utiliser la vidéo
  // Gère qui peut activer sa caméra lors des sessions en direct

  @Column('simple-array')
  screenShareAllowedRoles: string[];
  // Liste des rôles autorisés à partager leur écran
  // Utile pour les présentations, démonstrations ou l'aide à distance

  @Column('simple-array')
  fileUploadAllowedRoles: string[];
  // Liste des rôles autorisés à télécharger des fichiers
  // Contrôle qui peut partager des documents, devoirs, ou ressources

  @Column('simple-array')
  moderationAllowedRoles: string[];
  // Liste des rôles ayant des droits de modération dans le canal
  // Définit qui peut supprimer des messages, exclure des utilisateurs, etc.

  @Column({ default: false })
  isAnnouncementOnly: boolean;
  // Si vrai, seuls les rôles autorisés peuvent poster, les autres ne peuvent que lire
  // Parfait pour les canaux d'annonces ou de consignes

  @Column({ default: true })
  allowReactions: boolean;
  // Autorise ou non l'utilisation de réactions aux messages
  // Permet une interaction légère et rapide, utile pour les sondages ou le feedback rapide

  @Column({ default: true })
  allowThreads: boolean;
  // Autorise ou non la création de fils de discussion
  // Aide à organiser les conversations et à garder les discussions connexes groupées

  @ManyToOne(() => Type, (type) => type.configs)
  type: Type;
  // Relation avec l'entité Type, définissant le type de canal (ex: textuel, vocal, annonce)
  // Permet de catégoriser les configurations pour différents types de canaux
}
