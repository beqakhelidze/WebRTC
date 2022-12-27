import React, { useEffect } from "react";
import { TextInput, Group, Box, Container, Text, } from '@mantine/core';
import StyledButton from "../styledComponents/styledButton";
import { Link } from "react-router-dom";
import { useForm } from '@mantine/form';
import useRequest from "../hooks/useRequest";
import CustomLoader from "../components/loader";
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {

    const navigate = useNavigate();

    const { payload, sendRequest } = useRequest(
        {
            method: "post",
            url: "/users/login"
        }
    );

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            termsOfService: false,
        },
        validate: {
            email: (value: string) => (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value) ? null : 'Invalid email'),
            password: (value: string) => (/^[a-z0-9]{4,15}$/i.test(value) ? null : 'Invalid Password'),
        },
    });

    const loginUser = () => {
        sendRequest(form.values);
    }


    useEffect(() => {
        if (payload.data) {
            localStorage.setItem('token', payload.data.data.token);
            navigate("/"+ payload.data.data.user);
        };
    }, [payload.data, navigate]);

    return (
        <>
            <Container sx={{ height: "80vh", display: "grid", alignItems: "center", justifyContent: 'center' }}>
                {payload.loading ? <CustomLoader /> :
                    <Box sx={{ width: 300 }} mx="auto">
                        <form onSubmit={form.onSubmit(() => loginUser())}>
                            <TextInput
                                label="Email"
                                placeholder="Email"
                                {...form.getInputProps('email')}
                                m={10}
                            />

                            <TextInput
                                label="Password"
                                placeholder="Enter Password"
                                type="password"
                                {...form.getInputProps('password')}
                                m={10}
                            />
                            {payload.error ?
                                <Alert icon={<IconAlertCircle size={16} />} color="red">
                                    {payload.error.message}
                                </Alert>
                                : null
                            }
                            <Group position="center" mt="md" mb="xs">
                                <StyledButton type="submit">Login</StyledButton>
                            </Group>
                            <Text color="dimmed" align="center">
                                Don't have an account?
                                <Link to="/register">
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
                                        Sign Up
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

export default Login;