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

## 2. Créer des Product et des Price

Sur Stripe, tu vas pouvoir créer des `Product` et des `Price` pour chaque élément. Je te laisse suivre leur documentation pour le faire.

- [Documentation Stripe](https://stripe.com/docs/invoicing/products-prices)

**Ce qui est important c'est que pour chaque product** tu définissent le plan correspondant dans les `metadata` :

![](/docs/images/stripe-product-metadata.png)

Attention à bien utiliser **la même string** qu'on a défini dans le fichier `prisma.schema`.

Puis tu vas pouvoir récupérer l'`id` de chaque `Price` et venir le stocker dans ton application.

Dans les **webhooks** je récupères de manière automatique les metadata des `products` afin de mettre à jour le plan de l'utilisateur.
