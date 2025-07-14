import React from 'react';
import { NAV_LINKS } from '../constants';

export const Footer = () => {
    return (
        <footer className="bg-[--background-secondary] border-t border-[--border-primary]">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-2xl font-bold text-[--text-primary]">Tessa Studio</h3>
                        <p className="text-[--text-secondary] mt-2">Centro de Innovación Tecnológica</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-[--text-primary] tracking-wider">Navegación</h4>
                        <ul className="mt-4 space-y-2">
                            {NAV_LINKS.map(link => (
                                <li key={`footer-${link.name}`}>
                                    <a href={link.href} className="text-[--text-secondary] hover:text-[--text-primary] transition-colors">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-[--text-primary] tracking-wider">Contacto</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="mailto:contacto@tessastudio.com" className="text-[--text-secondary] hover:text-[--text-primary] transition-colors">contacto@tessastudio.com</a></li>
                            <li><p className="text-[--text-secondary]">Innovación y Desarrollo</p></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-[--border-primary] text-center text-[--text-secondary]">
                    <p>&copy; {new Date().getFullYear()} Tessa Studio. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}