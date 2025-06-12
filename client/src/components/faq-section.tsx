
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What types of PDFs can I upload?",
    answer: "You can upload any PDF document. Our system works with text-based PDFs, scanned documents with OCR, research papers, manuals, reports, and more.",
  },
  {
    question: "How are my documents stored and processed?",
    answer: "Your documents are securely processed and not shared with third parties. We use advanced encryption to ensure your information remains private.",
  },
  {
    question: "What kind of questions can I ask about my PDFs?",
    answer: "You can ask a wide range of questions about your document content, including factual information, summaries, explanations of specific sections, definitions, and more.",
  },
  {
    question: "Is there a limit to how many questions I can ask?",
    answer: "In the free version, there are some limits on the number of questions. Premium users get unlimited questions and priority processing.",
  },
  {
    question: "How accurate are the answers?",
    answer: "Our AI system is trained to provide accurate answers based on the content of your document. However, always verify critical information as AI systems can occasionally make mistakes.",
  },
];

export function FAQSection() {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 gradient-heading">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="glassmorphism mb-4 rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-accent/5">
              <span className="text-left font-medium">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <p className="text-muted-foreground">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
