import React from 'react'
import {
    IconButton,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    useDisclosure,
    ButtonGroup
  } from '@chakra-ui/react' 
import {
    HamburgerIcon
} from '@chakra-ui/icons'

export function MainMenu(){
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
            <Button
                margin="1px"
                onClick={onOpen}
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon size="lg"/>}
                variant='outline'
                size="lg"
                bg="#D6E6F9"
            />
            <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader display="flex" borderBottomWidth='1px' justifyContent="center">Menu</DrawerHeader>
                        <DrawerBody>
                        <ButtonGroup display="flex" flexDirection="column" justifyItems="center" alignItems="center">
                            <Button variant='ghost' width="100%">
                                Account
                            </Button>
                            <Button variant='ghost' width = "100%" color="red">
                                Log out
                            </Button>
                        </ButtonGroup>
                        </DrawerBody>
                    </DrawerContent>
            </Drawer>
        </>
    )
}