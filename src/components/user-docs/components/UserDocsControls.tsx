import { Button } from "@/ui";
import { useRouter } from "next/navigation";
import theme from "@/utils/theme";
import { ControlsContainer } from "../styles";

export function UserDocsControls() {
  const router = useRouter();

  return (
    <ControlsContainer>
      <Button
        onClick={() => router.push("/user-docs/create")}
        label="Добавить"
        textColor={theme.palette.primary.main}
      />
    </ControlsContainer>
  );
}
