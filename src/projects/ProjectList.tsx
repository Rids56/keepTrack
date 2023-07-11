import { SyntheticEvent, useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
  projects: Project[];
  onSave: (project : Project) => void;
}

//parent
function ProjectList({ projects, onSave }: ProjectListProps) {
  // return <pre>{JSON.stringify(projects, null, ' ')}</pre>;
  const [editValue, setEditValue] = useState({});

  const handleEdit = (project: Project) => {
    setEditValue(project);
  }

  const cancelEdit = () => {
    setEditValue({});
  }

  const items = projects.map((e) => (
    <div key={e.id} className='cols-sm'>
      {e === editValue ? (
        <ProjectForm project={e} onSave={onSave} onCancel={cancelEdit} />
      ) : (
        <ProjectCard project={e} onEdit={handleEdit}></ProjectCard>
      )}


    </div>
  ))

  return (<div className='row'> {items} </div>)
}

export default ProjectList;