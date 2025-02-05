import { useEffect, useState, lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import Navbar from './components/Navbar';
const DashboardComponent = lazy(() =>
  import("./components/Dashboard"));
const CounterComponent = lazy(() =>
  import("./components/CounterComponent"));
const UserFormComponent = lazy(() =>
  import("./components/UserForm"));
const EditorComponent = lazy(() =>
  import("./components/Editor"));
import { SignIn, useUser } from '@clerk/clerk-react';
import { generateBulletPoints } from './helper/generateUser';
import Signin from './pages/sign-in';
import Loader from './components/Loader';

function App() {
  const [quillValue, setQuillValue] = useState<string>("");
  const { user } = useUser();

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setQuillValue(generateBulletPoints(parsedData));
    }
  }, []);

  if (!user) {
    return <SignIn />
  }

  return (
   <>
     <BrowserRouter>
     {user &&  <Navbar />}
      <Routes>
    
        <Route path='/sign-in' element={<Signin/>} />
     
      </Routes>
      <Routes>
        {user ? (
          <Route path="/" element={
            <Box bg="bg.subtle" minH="100vh" py={8}>
              <Container maxW="container.xl">
                <Suspense fallback={<Loader title="Dashboard loading please wait..."/>}>
                  <DashboardComponent />
                </Suspense>
              </Container>
            </Box>
          } />
        ) : (
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        )}

        {user && (
          <Route path="/counter" element={
            <Box bg="bg.subtle" minH="100vh" py={8}>
              <Container maxW="container.xl" bg="bg.subtle">

                <SimpleGrid columns={{ base: 1, md: 2 }} p={6} m={8} gap={5}>
                  <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                    <Suspense fallback={<Loader title="CounterComponent loading please wait.."/>}>
                      <CounterComponent />
                    </Suspense>
                  </Box>
                  <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                    <Suspense fallback={<Loader title="Editor loading please wait..."/>}>
                      <EditorComponent value={quillValue} onChange={setQuillValue} />
                    </Suspense>
                  </Box>
                </SimpleGrid>
                <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" m={8}>
                  <Suspense fallback={<Loader title="UserFormComponent loading please wait..."/>}>
                    <UserFormComponent />
                  </Suspense>
                </Box>

              </Container>
            </Box>
          } />
        )}

        <Route path="*" element={
          <p style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
            fontSize: "32px"
          }}>
            Page Not Found...
          </p>
        } />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
