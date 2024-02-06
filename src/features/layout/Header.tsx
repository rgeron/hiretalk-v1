import { AuthButton } from "../auth/HeaderAuthButton";
import { HeaderBase } from "./HeaderBase";

export function Header() {
  return (
    <HeaderBase>
      <AuthButton />
    </HeaderBase>
  );
}
