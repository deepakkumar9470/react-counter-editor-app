import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { saveUserData } from "../store/userSlice";
import { v4 as uuidv4 } from "uuid";
import {
    Box,
    Button,
    Input,
    Text,
    VStack,
    Flex,
    Heading,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { generateBulletPoints } from "@/helper/generateUser";
import { RootState } from "@/store/store";
import { toaster } from "@/components/ui/toaster"

const userSchema = z.object({
    name: z.string().min(2, "Name is required"),
    address: z.string().min(5, "Address is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    userId: z.string(),
});

const UserForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const storedUserData = useAppSelector((state: RootState) => state.users);
    const [quillValue, setQuillValue] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: storedUserData,
    });

    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isDirty || unsavedChanges) {
                event.preventDefault();
                event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isDirty, unsavedChanges]);

    useEffect(() => {
        const savedData = localStorage.getItem("userData");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setQuillValue(generateBulletPoints(parsedData));
            reset(storedUserData);
        }
    }, [storedUserData, reset]);

    const onSubmit = (data: any) => {
        setLoading(true)
        try {
            const updatedData = { ...data, userId: data.userId || uuidv4() };
            dispatch(saveUserData(updatedData));
            localStorage.setItem("userData", JSON.stringify(updatedData));
            setUnsavedChanges(false);
            toaster.create({
                description: "User data saved successfully..",
                type: "success",
            })
            setQuillValue(generateBulletPoints(updatedData));
        } catch (error) {
            toaster.create({
                description: "Something went wrong. Please try again.",
                type: "error",
                duration: 3000,
            });
        }finally{
            setLoading(false)
        }
    };

    return (
        <Box p={6} borderWidth={1} borderRadius="md" maxW="1240px" mx="auto">
            <Heading as="h2" size="2xl" textAlign="center" mb={6}>
                User Form & Editor
            </Heading>

            <Flex gap={10} direction={{ base: "column", md: "row" }}>
                <Box flex="1" p={4} borderWidth={1} borderRadius="md">
                    <Heading as="h3" size="md" mb={4}>
                        User Form
                    </Heading>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack m={4} align="stretch">
                            <Box>
                                <Text fontWeight="bold">Name</Text>
                                <Input {...register("name")} p={2} />
                                {errors.name && <Text color="red.500">{errors.name.message}</Text>}
                            </Box>

                            <Box>
                                <Text fontWeight="bold">Address</Text>
                                <Input {...register("address")} p={2}/>
                                {errors.address && <Text color="red.500">{errors.address.message}</Text>}
                            </Box>

                            <Box>
                                <Text fontWeight="bold">Email</Text>
                                <Input {...register("email")} p={2} />
                                {errors.email && <Text color="red.500">{errors.email.message}</Text>}
                            </Box>

                            <Box>
                                <Text fontWeight="bold">Phone</Text>
                                <Input {...register("phone")} p={2}/>
                                {errors.phone && <Text color="red.500">{errors.phone.message}</Text>}
                            </Box>

                            <Button type="submit" colorScheme="blue" disabled={loading}>
                                {loading? "Saving....": "Save"}
                            </Button>
                        </VStack>
                    </form>
                </Box>

                <Box flex="1" p={4} borderWidth={1} borderRadius="md">
                    <Heading as="h3" size="md" mb={4}>
                        User Data
                    </Heading>
                    <ReactQuill value={quillValue} onChange={setQuillValue} theme="snow" />

                    {storedUserData && (
                        <Box mt={6} p={4} borderWidth={1} borderRadius="md">
                            <Text fontWeight="bold">Stored User Data:</Text>
                            <Box borderWidth={1} p={2} borderRadius="md">
                                <ReactQuill value={quillValue} readOnly theme="bubble" />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default UserForm;
