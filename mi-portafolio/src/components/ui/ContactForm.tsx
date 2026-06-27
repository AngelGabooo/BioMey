'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { contactSchema, ContactFormData } from '@/schemas/contactSchema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContactFormProps {
  className?: string;
}

export const ContactForm = ({ className }: ContactFormProps) => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Form data:', data);
    // Aquí iría la lógica para enviar el formulario
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Nombre</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Tu nombre completo" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 transition-all duration-300"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Email</FormLabel>
              <FormControl>
                <Input 
                  type="email"
                  placeholder="tu@email.com" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 transition-all duration-300"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Asunto</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Asunto del mensaje" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 transition-all duration-300"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Mensaje</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Cuéntame sobre tu proyecto..." 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/30 transition-all duration-300 min-h-[150px] resize-y"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 group"
        >
          Enviar Mensaje
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            className="ml-2"
          >
            →
          </motion.span>
        </Button>
      </form>
    </Form>
  );
};