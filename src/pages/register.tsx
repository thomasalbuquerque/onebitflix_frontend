import styles from '../styles/registerLogin.module.scss';
import Head from 'next/head';
import HeaderGeneric from '@/components/common/headerGeneric';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '@/components/common/footer';
import { FormEvent, useEffect, useState } from 'react';
import authService from '@/services/authService';
import { useRouter } from 'next/router';
import ToastComponent from '@/components/common/toast';

const Register = function () {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('onebitflix-token')) {
      router.push('/home');
    }
  }, []);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get('firstName')!.toString();
    const lastName = formData.get('lastName')!.toString();
    const phone = formData.get('phone')!.toString();
    const birth0 = formData.get('birth')!.toString();
    const birth1 = new Date(
      Number(birth0.slice(6, 10)),
      Number(birth0.slice(3, 5)) - 1, //monthIndex
      Number(birth0.slice(0, 2))
    );
    const birth = birth1.toString();
    const email = formData.get('email')!.toString();
    const password = formData.get('password')!.toString();
    const confirmPassword = formData.get('confirmPassword')!.toString();
    const params = { firstName, lastName, phone, birth, email, password };

    if (password != confirmPassword) {
      setToastMessage('Senha e confirmação diferentes.');
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);

      return;
    }
    const { data, status } = await authService.register(params);

    if (status === 201) {
      router.push('/login?success=true');
    } else {
      setToastMessage(data.message);
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
    }
  };

  return (
    <>
      <Head>
        <title>Onebitflix - Registro</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <script src="https://jsuites.net/v4/jsuites.js"></script>
      </Head>
      <main className={styles.main}>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/login"
          btnContent="Quero fazer login"
        />
        <Container className="py-5">
          <p className={styles.formTitle}>Bem-vindo(a) ao OneBitFlix!</p>
          <Form className={styles.form} onSubmit={handleRegister}>
            <p className="text-center">
              <strong>Bem-vindo(a) ao OneBitFlix!</strong>
            </p>
            <FormGroup>
              <Label for="firstName" className={styles.label}>
                NOME
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Qual o seu nome?"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName" className={styles.label}>
                SOBRENOME
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Qual o seu sobrenome?"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone" className={styles.label}>
                WHATSAPP / TELEGRAM
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(xx) 9xxxx-xxxx"
                data-mask="[-]+55 (00) 00000-0000"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email" className={styles.label}>
                E-MAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite o seu email"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birth" className={styles.label}>
                DATA DE NASCIMENTO
              </Label>
              <Input
                id="birth"
                name="birth"
                // type="date"
                // min="01-01-1930"
                // max="31-12-2020"
                // format='DD/MM/YYYY'
                data-mask="DD/MM/YYYY"
                placeholder="DD-MM-AAAA"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                SENHA
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite a sua senha (Min: 6 | Max: 20)"
                required
                minLength={6}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword" className={styles.label}>
                CONFIRME SUA SENHA
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirme a sua senha"
                required
                minLength={6}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>
              CADASTRAR
            </Button>
          </Form>
        </Container>
        <ToastComponent
          color="bg-danger"
          isOpen={toastIsOpen}
          message={toastMessage}
        />
        <Footer />
      </main>
    </>
  );
};

export default Register;
