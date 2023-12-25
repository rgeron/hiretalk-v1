Dans le cas ou ton application contient plusieurs plan, par exemple :

- FREE : un utilisateur qui n'a pas payé
- IRON : un utilisateur qui a payé 10€/mois
- GOLD : un utilisateur qui a payé 30€/mois
- PLATINIUM : un utilisateur qui a payé 100€/mois

Pour gérer les plans, voici la marche à suivre.

## 1. Update `prisma.schema`

Dans le fichier `prisma` tu trouveras cette enum :

```prisma
enum UserPlan {
  FREE
  PREMIUM
}
```

Tu vas pouvoir ajouter tes plans :

```prisma
enum UserPlan {
  FREE
  IRON
  GOLD
  PLATINIUM
}
```

Puis migrer ta base de données :

```bash
prisma migrate dev
```

## 2. Créer des prices Stripe

Sur Stripe, tu vas pouvoir créer des `Price` pour chaque catégorie de plan.

Puis tu vas pouvoir récupérer l'`id` de chaque `Price` et venir le stocker dans ton application.
