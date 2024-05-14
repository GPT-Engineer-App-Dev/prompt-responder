import { useState } from 'react';
import { Box, Flex, Textarea, Button, Text, useToast } from '@chakra-ui/react';
import { create } from 'lib/openai';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const toast = useToast();

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Error',
        description: "Prompt cannot be empty.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const res = await create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo'
    });
    if (res.data.choices && res.data.choices.length > 0) {
      setResponse(res.data.choices[0].message.content);
    } else {
      toast({
        title: 'Error',
        description: "Failed to fetch response.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh" p={4}>
      <Box width={{ base: "90%", md: "50%" }} p={5} borderWidth="1px" borderRadius="lg">
        <Textarea
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={handleInputChange}
          size="lg"
          mb={4}
        />
        <Button colorScheme="blue" onClick={handleSubmit} mb={4}>Submit</Button>
        <Text fontWeight="bold">Response:</Text>
        <Text mt={2}>{response}</Text>
      </Box>
    </Flex>
  );
};

export default Index;