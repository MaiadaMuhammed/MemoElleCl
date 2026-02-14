'use client'
import { useState } from 'react'

const faqs = [
    { q: "What is your return policy?", a: "We accept returns within 14 days of delivery for unworn items with tags attached." },
    { q: "Do you ship internationally?", a: "Currently we ship within Egypt, but we are working on expanding globally soon." },
    { q: "How can I track my order?", a: "You can track your order from your account dashboard under 'Orders'." },
    { q: "Are your products authentic?", a: "Yes, all our products are 100% authentic and carefully curated." },
]

export default function FAQPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-display text-center mb-12 text-brand-primary-800">Frequently Asked Questions</h1>
            <div className="space-y-4">
                {faqs.map((item, i) => (
                    <Accordion key={i} question={item.q} answer={item.a} />
                ))}
            </div>
        </div>
    )
}

function Accordion({ question, answer }: any) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="border border-brand-cream-500 rounded-lg bg-white overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left font-medium text-brand-primary-800 hover:bg-brand-cream-50"
            >
                {question}
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && <div className="p-4 pt-0 text-gray-600 leading-relaxed border-t border-brand-cream-100">{answer}</div>}
        </div>
    )
}