Quand tu créer une application tu as constamment besoin de **feedback** utilisateur. Pour ça, j'ai créer plusieur composant de "Contact".

## ContactSupportDialog

Ce composant va venir ouvrir un `Dialog` qui permet à l'utilsiateur d'ajouté un `Sujet` et un `Message` et automatiquement t'envoyer un mail.

Pour l'utiliser, il suffit de faire :

```tsx
import { ContactSupportDialog } from "@/features/contact/support/ContactSupportDialog";

<ContactSupportDialog />;
```

Tu peux aussi custimizer le bouton qui va être afficher pour ouvrir le `Dialog` :

```tsx
import { ContactSupportDialog } from "@/features/contact/support/ContactSupportDialog";
import { Button } from "@/components/ui/button";

<ContactSupportDialog>
  <Button size="sm" variant="secondary">
    Contacter le support
  </Button>
</ContactSupportDialog>;
```

Par défaut, j'affiche :

```tsx
<Button variant="outline">Contact support</Button>
```

## ContactFeedbackPopover

Afin d'avoir un feedback rapide des utilisateurs, tu peux ajouter un `ContactFeedbackPopover` qui va affiché une Popover qui offre à l'utilisateur de mettre un message ainsi qu'une "review" sous forme d'émoji et de l'envoyé.

Le but ?

Pouvoir facilement savoir ce qui plaît ou non à tes utilisateurs.

De la même manière que le `ContactSupportDialog`, tu peux custumizer le bouton qui va ouvrir la Popover :

```tsx
import { ContactFeedbackPopover } from "@/features/contact/feedback/ContactFeedbackPopover";

<ContactFeedbackPopover>
  <Button size="sm" variant="secondary">
    Feedback
  </Button>
</ContactFeedbackPopover>;
```

Par défaut, j'affiche :

```tsx
<Button variant="outline">Feedback</Button>
```
