import React, { useState, useEffect } from 'react';
import { Button, VStack, Text, useToast, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Profile = () => {
    const access = localStorage.getItem('access');

    const toast = useToast();
    const [detail, setDetail] = useState({
        id: '',
        first_name: '',
        first_name: '',
        user_type: '',
        address: '',
        profile_picture: '',
        email: '',
        username: '',
        password: '',
        repassword: '',
    });
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            toast({
                title: '',
                description: 'Logout Successfull',
                status: 'success',
                variant: 'left-accent',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("id");
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/user/?id=${localStorage.getItem('id')}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${access}`,
                },
            });
            setDetail(response.data)
            console.log(response.data);
        } catch (error) {
            handleLogout()
            console.error(error);
        }
    };
    useEffect(() => {
        if (access)
            fetchData();
        else handleLogout()
    }, []);
    return (

        <VStack as="form"
            spacing={4}
            align="stretch"
            maxW="400px"
            mx="auto"
            p={8}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg">
            <Text fontSize="3xl" fontWeight="bold">
                Profile Details
            </Text>
            {detail.profile_picture ? (
                <Image
                    src={"http://localhost:8000" + detail.profile_picture}
                    alt="Profile Photo"
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="full"
                    my={4}
                />
            ) : (
                <Text>No profile picture available</Text>
            )}
            <Text fontSize="lg">
                <strong>ID:</strong> {detail.id}
            </Text>
            <Text fontSize="lg">
                <strong>First Name:</strong> {detail.first_name}
            </Text>
            <Text fontSize="lg">
                <strong>Last Name:</strong> {detail.last_name}
            </Text>
            <Text fontSize="lg">
                <strong>Email:</strong> {detail.email}
            </Text>
            <Text fontSize="lg">
                <strong>Address:</strong> {detail.address}
            </Text>
            <Text fontSize="lg">
                <strong>Type:</strong> {detail.user_type}
            </Text>
            <Text fontSize="lg">
                <strong>Username:</strong> {detail.username}
            </Text>
            {/* Add more details as needed */}
            <Button colorScheme="teal" variant="solid" onClick={handleLogout}>
                Logout
            </Button>
        </VStack>
    );
};

export default Profile;
