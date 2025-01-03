'use client'

import { useState } from 'react'
import Logo from "./images/logo.png";
import Image from "next/image";

import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
} from "@headlessui/react"
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { FaPhone } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';

const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-white">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <Image src={Logo} alt="" width={150}/>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                    >
                        <span className="sr-only">Abrir Menu</span>
                        <Bars3Icon aria-hidden="true"
                                   className="h-6 w-6 text-[rgb(69,151,69)]"/>
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <a href="/" className="text-sm font-semibold leading-6 text-black hover:text-[rgb(69,151,69)]">
                        Início
                    </a>
                    <a href="/filter" className="text-sm font-semibold leading-6 text-black hover:text-[rgb(69,151,69)]">
                        Imóveis
                    </a>
                    <a href="/" className="text-sm font-semibold leading-6 text-black hover:text-[rgb(69,151,69)]">
                        Vendidos
                    </a>
                    <a href="/" className="text-sm font-semibold leading-6 text-black hover:text-[rgb(69,151,69)]">
                        Loteamentos
                    </a>
                    <a href="/" className="text-sm font-semibold leading-6 text-black hover:text-[rgb(69,151,69)]">
                        Sobre
                    </a>
                </PopoverGroup>

                <div className="hidden lg:flex items-center gap-4 ml-6">

                    <span className="lg:flex items-center text-sm font-medium gap-1 text-gray-700">
                        <FaWhatsapp />
                        (67) 9 9950-9939
                    </span>

                    <div className="h-6 border-l border-gray-300"></div>
                    
                    <span className="lg:flex items-center text-sm font-medium gap-1 text-gray-700">
                        <FaPhone/>
                        (67) 9 9950-9939
                    </span>
                </div>
            </nav>
            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-10 bg-black bg-opacity-50"/>
                <DialogPanel
                    className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-transform transform-gpu duration-300 ease-in-out"
                    style={{
                        transform: mobileMenuOpen? 'translateX(0%)' : 'translateX(100%)',
                    }}
                >
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <Image src={Logo} alt="" width={150}/>
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-black-700"
                        >
                            <span className="sr-only">Fechar Menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <a
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black-900 hover:text-[rgb(69,151,69)]"
                                >
                                    Início
                                </a>
                                <a
                                    href="/filter"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black-900 hover:text-[rgb(69,151,69)]"
                                >
                                    Imóveis
                                </a>
                                <a
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black-900 hover:text-[rgb(69,151,69)]"
                                >
                                    Loteamentos
                                </a>
                                <a
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black-900 hover:text-[rgb(69,151,69)]"
                                >
                                    Sobre
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <FaWhatsapp />
                            <span className="text-sm font-medium text-gray-700">+55 11 1234-5678</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaPhone />
                            <span className="text-sm font-medium text-gray-700">+55 11 98765-4321</span>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
