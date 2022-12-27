import React from "react";
import { TextInput, Group, Box, Container, Text } from '@mantine/core';
import StyledButton from "../styledComponents/styledButton";
import { Link } from "react-router-dom";
import { useForm } from '@mantine/form';
import useRequest from "../hooks/useRequest";
import CustomLoader from "../components/loader";
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

interface RegisterInterface {
    name: string,
    email: string,
    password: string,
    rePassword: string,
}

const Register: React.FC = () => {

    const { payload, sendRequest } = useRequest(
        {
            method: "post",
            url: "/users"
        }
    );

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            termsOfService: false,
        },
        validate: {
            name: (value: string) => (/^[a-z0-9]{4,15}$/i.test(value) ? null : 'Invalid Name'),
            email: (value: string) => (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value) ? null : 'Invalid email'),
            password: (value: string) => (/^[a-z0-9]{4,15}$/i.test(value) ? null : 'Invalid Password'),
            rePassword: (value: string) => (/^[a-z0-9]{4,15}$/i.test(value) ? null : 'Invalid Re-Password'),
        },
    });

    const RegisterUser = async (Values: RegisterInterface) => {
        if (Values.password !== Values.rePassword) {
            form.setFieldError('rePassword', "Passwords aren't same!");
            return;
        };
        sendRequest({
            name: Values.name,
            email: Values.email,
            password: Values.password,
        });
    }

    return (
        <>
            <Container sx={{ height: "80vh", display: "grid", alignItems: "center", justifyContent: 'center' }}>
                {payload.loading ? <CustomLoader /> :
                    <Box sx={{ width: 300 }} mx="auto">
                        <form onSubmit={form.onSubmit((values: RegisterInterface) => RegisterUser(values))}>
                            <TextInput
                                label="Name"
                                placeholder="Name"
                                {...form.getInputProps('name')}
                                id="name"
                                m={10}
                            />
                            <TextInput
                                label="Email"
                                placeholder="Email"
                                {...form.getInputProps('email')}
                                id="email"
                                m={10}
                            />
                            <TextInput
                                label="Password"
                                type="password"
                                placeholder="Enter Password"
                                {...form.getInputProps('password')}
                                id="password"
                                m={10}
                            />
                            <TextInput
                                label="Re-Password"
                                type="password"
                                placeholder="Re-enter Password"
                                {...form.getInputProps('rePassword')}
                                id="rePassword"
                                m={10}
                            />
                            {payload.error ?
                                <Alert icon={<IconAlertCircle size={16} />} color="red">
                                    {payload.error.message}
                                </Alert>
                                : null
                            }
                            {payload.data ?
                                <Alert icon={<IconAlertCircle size={16} />} color="green">
                                    User is registered!
                                </Alert>
                                : null
                            }
                            <Group position="center" mt="md" mb="xs">
                                <StyledButton type="submit">Sign up</StyledButton>
                            </Group>
                            <Text color="dimmed" align="center">
                                Already have an account?
                                <Link to="/login">
                                    <Text
                                        component="span"
                                        align="center"
                                        variant="gradient"
                                        style={{
                                            fontFamily: 'Greycliff CF, sans-serif',
                                            margin: "5px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Log in
                                    </Text>
                                </Link>
                            </Text>
                        </form>
                    </Box>
                }
            </Container>
        </>
    );
}

export default Register;