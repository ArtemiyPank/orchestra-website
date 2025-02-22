import Card from '@/components/Card';

const programs = [
  {
    title: 'Classical Evening',
    image: '/images/program1.jpg',
    description: 'A beautiful selection of classical music pieces.',
  },
  {
    title: 'Modern Tunes',
    image: '/images/program2.jpg',
    description: 'Experience modern music with a classical twist.',
  },
  {
    title: 'Jazz Night',
    image: '/images/program3.jpg',
    description: 'An evening filled with smooth jazz and improvisation.',
  },
];

const OrchestraPrograms = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Orchestra Programs</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {programs.map((program) => (
        <Card key={program.title} {...program} />
      ))}
    </div>
  </div>
);

export default OrchestraPrograms;
