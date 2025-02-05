import  { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Container } from "@chakra-ui/react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend ,LineChart, Line, XAxis, YAxis, CartesianGrid} from "recharts";
import {animated, useTrail } from "@react-spring/web"; 

const COLORS = ["#0088FE", "#00C49F", "#FFE893", "#FF8042", "#FF76CE"];

const Dashboard = () => {
    const [userData, setUserData] = useState<Record<string, string | number>>({});

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            setUserData(JSON.parse(storedData)); 
        }
    }, []);

    const pieChartData = Object.entries(userData).map(([key, value]) => ({
        name: String(value), 
        value: typeof value === "string" ? value.length : Number(value) 
    }));

    const lineChartData = [
        { index: 1, value: Number(localStorage.getItem("count-increase")) },
        { index: 2, value: Number(localStorage.getItem("count-increase")) },
        { index: 3, value: Number(localStorage.getItem("count-increase")) },
        { index: 4, value: Number(localStorage.getItem("count-increase")) },
        { index: 5, value: Number(localStorage.getItem("count-increase")) }
    ];


    const trail = useTrail(lineChartData.length, {
        opacity: 1,
        x: 1,
        from: { opacity: 0, x: 0 },
        config: { tension: 120, friction: 14 },
    });
    return (
        <Container maxW="6xl" py={8}>
            <SimpleGrid columns={{ base: 1, md: 2 }} m={8} gap={5} px={10}>
                <animated.div style={trail[0]}>
                <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
                    <Heading as="h3" size="md" mb={4} textAlign="center">
                        Count Line Chart
                    </Heading>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="index" name=""  />
                            <Tooltip />
                            <YAxis />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#FF4567" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
                </animated.div>
              

                <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
                    <Heading as="h3" size="md" mb={4} textAlign="center">
                      User Pie Chart
                    </Heading>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie 
                            data={pieChartData} 
                            dataKey="value" 
                            nameKey="name" 
                            cx="50%" 
                            cy="50%" 
                            label>
                                {pieChartData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </SimpleGrid>
        </Container>
    );
};

export default Dashboard;
