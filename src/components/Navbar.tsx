import { Box, Flex, Spacer, Button, useBreakpointValue, Stack } from "@chakra-ui/react";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useAuth } from '@clerk/clerk-react'
import { useClerk } from "@clerk/clerk-react"
import { Link } from "react-router-dom";
import { ColorModeButton } from "@/components/ui/color-mode"

const Navbar = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { userId } = useAuth()
    const { signOut } = useClerk()

    return (
        <Box px={10} py={0} bg="bg.subtle" borderColor="gray.400/20" borderWidth="1px">
            <Flex align="center">
                <Link to="/">
                    <Box color="gray.400" fontWeight="bold" fontSize="xl" px={10} bg="bg.subtle">
                        Upliance.ai
                    </Box>
                </Link>
                <Spacer />
                <Stack direction={isMobile ? "column" : "row"} m={4} align="center">
                    {userId && <Link to="/">
                        <Button colorPalette="blue" size="xs" variant="solid" _hover={{ color: "gray.300" }} px={2}>
                            Home
                        </Button>
                    </Link>}
                    {userId && <Link to="/counter">
                        <Button colorPalette="blue" size="xs" variant="solid" _hover={{ color: "gray.300" }}  px={2}>
                            Counter
                        </Button>
                    </Link>}

                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    {
                        userId &&
                        <Button type="submit" size="xs" colorPalette="ghost" variant="outline" onClick={() => signOut({ redirectUrl: '/' })}  px={2}>
                            Logout
                        </Button>
                    }
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <ColorModeButton />

                </Stack>
            </Flex>
        </Box>
    );
};

export default Navbar;
