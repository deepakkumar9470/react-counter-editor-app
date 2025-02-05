import { Spinner, Text, VStack } from "@chakra-ui/react"

const Loader = ({title}:{title:string}) => {
  return (
    <VStack width={"100%"} height={"100%"}>
      <Spinner color="blue.500" borderWidth="4px" />
      <Text color="colorPalette.600">{title}</Text>
    </VStack>
  )
}

export default Loader
