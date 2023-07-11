import React from 'react'
import { Project } from './Project'
import moment from 'moment';

interface ProjectDetailsProps {
  project: Project;
}

function ProjectDetail({ project }: ProjectDetailsProps) {
  return (
    <div className='row'>
      <div className='col-sm-6'>
        <div className='card large'>
          <img
            className='rounded'
            src={project.imageUrl}
            alt={project.name}
          />
          <section className='section dark'>
            <h3 className='strong'>
              <strong>{project.name}</strong>
            </h3>
            <p>{project.description}</p>
            <p>{project.budget}</p>
            
            <p>Signed: {moment(project.contractSignedOn).format('YYYY-MM-DD HH:MM:SS')}</p>
            <p>
              <mark className='active'>
                {' '}
                {project.isActive ? 'active' : 'inactive'}
              </mark>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail