import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Note, Tag } from '@/types/note';
import { Metadata } from 'next';


export const  metadata :Metadata ={
  title:'Notes',
  description:'Main Notes Page and Creating New Notes',
  icons:'/notehub-og-meta.webp',
  openGraph:{
    title:'Notes',
    description:'Main Notes Page and Creating New Notes',
    url:'https://08-zustand-black.vercel.app/',
    siteName:'Notes',
    images:[{
      url:'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width:1200,
      height:630,
      alt:'Main Notes'
    }]
  }
}




interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const resolvedParams = await params; 
  const slug = resolvedParams.slug;
  
  const queryClient = new QueryClient();

  const tagFromSlug = slug?.[0] || 'All'; 
  const tag = tagFromSlug === 'All' ? undefined : (tagFromSlug as Tag); 

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag], 
    queryFn: () => fetchNotes('', 1, tag),
  });

  const initialData = queryClient.getQueryData<FetchNotesResponse>(['notes', '', 1, tag])!;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={initialData} initialTag={tagFromSlug} />
    </HydrationBoundary>
  );
}
