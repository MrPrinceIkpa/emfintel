'use client'
import styles from './page.module.css';
import HeroSection from '@/components/HeroSection/HeroSection';
import HomeForm from '@/components/HomeForm/HomeForm';
import QualitySection from '@/components/QualitySection/QualitySection';
import Features from '@/components/Features/Features';
import { useRef } from 'react';

export default function Home (){
    var formWrapper = useRef();

    const scrollFunc = function () {
        formWrapper.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return(
        <div className={styles.con}>
            <HeroSection scroll_to={scrollFunc} />
            <QualitySection />
            <div ref={formWrapper}>
                <HomeForm />
            </div>
            <Features />
        </div>
    )
}