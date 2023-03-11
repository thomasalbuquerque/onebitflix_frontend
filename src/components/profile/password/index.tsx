import ToastComponent from "@/components/common/toast";
import profileService from "@/services/profileService";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../styles/profile.module.scss";

const PasswordForm = function () {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    profileService.fetchCurrent().then((data) => {
      setCurrentPassword(data.currentPassword);
      setNewPassword(data.newPassword);
    });
  }, []);

  const handlePasswordUpadate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (newPassword != confirmPassword) {
      setToastIsOpen(true);
      setErrorMessage("Senha e confirmação de senha diferentes!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
  
      return;
    }

    if (currentPassword === newPassword) {
      setToastIsOpen(true);
      setErrorMessage("Não coloque a nova senha igual a senha antiga!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
  
      return;
    }

    const res = await profileService.passwordUpdate({
      currentPassword,
      newPassword,
    });

    if (res === 204) {
      setToastIsOpen(true);
      setErrorMessage("Senha alterada com sucesso!");
      setColor("bg-success");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    if (res === 400) {
      setToastIsOpen(true);
      setErrorMessage("Senha atual incorreta!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handlePasswordUpadate}>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="currentPassword">
              SENHA ATUAL
            </Label>
            <Input
              name="currentPassword"
              type="password"
              id="currentPassword"
              placeholder="******"
              required
              maxLength={12}
              className={styles.input}
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.currentTarget.value);
              }}
            />
          </FormGroup>
        </div>
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="newPassword">
              NOVA SENHA
            </Label>
            <Input
              name="newPassword"
              type="password"
              id="newPassword"
              placeholder="******"
              required
              className={styles.inputFlex} 
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.currentTarget.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="confirmNewPassword">
              CONFIRMAR NOVA SENHA
            </Label>
            <Input
              name="confirmNewPassword"
              type="password"
              id="confirmNewPassword"
              placeholder="******"
              required
              className={styles.inputFlex}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.currentTarget.value);
              }}
            />
          </FormGroup>
        </div>
        <Button className={styles.formBtn} outline type="submit">
          Salvar Alterações
        </Button>
      </Form>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
};

export default PasswordForm;
