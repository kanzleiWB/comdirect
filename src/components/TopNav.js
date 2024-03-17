import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";

export default function TopNav() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [brandName, setBrandName] = useState([])

    const menuItems = [
        {
            name: 'Über uns',
            tagetLink: '/about'
        },
        {
            name: 'Häufige Fragen',
            tagetLink: '/faqs'
        },
    ];

    useEffect(() => {
        const getBrandNameFromDB = async () => {
            const response = await fetch('/api/getBrandNameFromDB')
            const data = await response.json();
            if (data) {
                setBrandName(data);
            }
        }
        getBrandNameFromDB()
    }, [])

useEffect(() => {
  console.log(brandName.brandTitle);
}, [brandName])


    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll className="bg-[#FAFAFA] border-b z-50">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">{brandName.brandTitle}</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Impressum
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link href="#" color="foreground">
                        Datenschutzerklärung
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="#input" variant="flat">
                        Jetzt kostenfrei Testen
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full text-black border-b py-2"
                            href={item.tagetLink}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
