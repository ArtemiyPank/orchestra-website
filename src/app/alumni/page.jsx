import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

const alumni = [
  {
    title: 'Anna Kovalsky',
    image: '/images/alumni1.jpg',
    description: 'Anna shares her experience of playing the violin in the orchestra.',
  },
  {
    title: 'David Levin',
    image: '/images/alumni2.jpg',
    description: 'David talks about how being part of the orchestra influenced his life.',
  },
];

const AlumniInterviews = () => (
  <div>
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">Alumni Interviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alumni.map((person) => (
          <Card key={person.title} {...person} />
        ))}
      </div>
    </main>
  </div>
);

export default AlumniInterviews;
