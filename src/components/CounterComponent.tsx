import { useState, useEffect } from "react"
import { Box, Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react"
import { BiPlus, BiMinus, BiReset } from "react-icons/bi"
import { useSpring, animated } from "@react-spring/web";
const CounterComponent = () => {
    const [count, setCount] = useState<number>(() => {
        const savedCount = localStorage.getItem("count-increase");
        if (savedCount) {
            return parseInt(savedCount);
        }
        return 0;
    });
    const [bgLevel, setBgLevel] = useState<number>(0);

    const bgSpring = useSpring({
        bgOpacity: bgLevel / 100,
        config: { tension: 200, friction: 20 },
    });

    useEffect(() => {
        setBgLevel(Math.max(0, count * 10));
    }, [count]);

    const increaseCount = () => {
        setCount(prev => {
            if (prev >= 0) {
                const newCount = prev + 1
                localStorage.setItem("count-increase", JSON.stringify(newCount));
                return newCount;
            }
            return prev;
        });
    };

    const decreaseCount = () => {
        setCount(prev => {
            if (prev > 0) {
                const newCount = prev - 1
                localStorage.setItem("count-increase", JSON.stringify(newCount));
                return newCount;
            }
            return prev;
        });
    };

    const resetCount = () => {
        setCount(0);
        setBgLevel(0);
        localStorage.removeItem("count-increase");
    };

    return (
        <animated.div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "50vh",
                background: bgSpring.bgOpacity.to(opacity => `rgba(0, 150, 255, ${opacity})`),
            }}>
            <Box borderWidth="1px" borderRadius="lg" p={6} shadow="md" bg="bg.subtle">
                <VStack m={4}>
                    <Heading size="3xl">Count: {count}</Heading>
                    <ButtonGroup m={2}>
                        <Button colorPalette="green" onClick={increaseCount}>
                            <BiPlus />
                        </Button>
                        <Button colorPalette="red" onClick={decreaseCount}>
                            <BiMinus />
                        </Button>
                        <Button colorPalette="gray" onClick={resetCount}>
                            <BiReset />
                        </Button>
                    </ButtonGroup>
                </VStack>
            </Box>
        </animated.div>
    );
};

export default CounterComponent;
