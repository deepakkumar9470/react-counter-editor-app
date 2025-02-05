import { Link } from 'react-router-dom'
import { Flex, Text } from "@chakra-ui/react";

const Signin = () => {
  return (
    <div style={{display:"flex",justifyContent: "center", alignItems:"center", margin:"auto",height:"100vh"}}
    >
      <Text 
        fontSize="xl" 
        fontWeight="semibold" 
        color="gray.700" 
        textAlign="center"
      >
        <Link 
          to="/sign-in" 
          style={{
            color: "#2B6CB0", 
            fontWeight: 'bold',
            fontSize: '20px',
            textDecoration: 'underline',
          }}
        >
          Please Sign in...
        </Link>
      </Text>
    </div>
  );
}

export default Signin;
