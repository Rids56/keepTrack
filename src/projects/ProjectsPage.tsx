import { Fragment, useEffect, useState } from 'react';
import { MOCK_PROJECTS } from './MockProjects';
import { Project } from './Project';
import ProjectList from './ProjectList';
import { projectAPI } from '../projectAPI';
import { isEmpty } from 'lodash';

// import isEmpty from 'lodash';

// import { useEffect, useRef } from "react";
// import { useFieldArray, useForm } from "react-hook-form";

// interface FormData {
//   arrayFieldName: Array<{
//     id: number | undefined;
//     name: string | "";
//     description: string | "";
//     imageUrl: string | "";
//     contractTypeId: number | undefined;
//     contractSignedOn: string | "";
//     budget: number | undefined;
//     isActive: boolean;
//   }>;
// }
function ProjectsPage() {
  // const { control } = useForm<FormData>();
  // const counterRef = useRef(1); // Start counter at 1
  // const abc = useRef(true);

  // const initialValues: FormData['arrayFieldName'] = [
  //   {
  //     id: 1,
  //     name: "Johnson - Kutch",
  //     description:
  //       "Fully-configurable intermediate framework. Ullam occaecati libero laudantium nihil voluptas omnis.",
  //     imageUrl: "/assets/placeimg_500_300_arch4.jpg",
  //     contractTypeId: 3,
  //     contractSignedOn: "2013-08-04T22:39:41.473Z",
  //     budget: 54637,
  //     isActive: false
  //   },
  //   {
  //     id: 2,
  //     name: "Wisozk Group",
  //     description:
  //       "Centralized interactive application. Exercitationem nulla ut ipsam vero quasi enim quos doloribus voluptatibus.",
  //     imageUrl: "/assets/placeimg_500_300_arch1.jpg",
  //     contractTypeId: 4,
  //     contractSignedOn: "2012-08-06T21:21:31.419Z",
  //     budget: 91638,
  //     isActive: true
  //   },
  //   {
  //     id: 3,
  //     name: "Denesik LLC",
  //     description:
  //       "Re-contextualized dynamic moratorium. Aut nulla soluta numquam qui dolor architecto et facere dolores.",
  //     imageUrl: "/assets/placeimg_500_300_arch12.jpg",
  //     contractTypeId: 6,
  //     contractSignedOn: "2016-06-26T18:24:01.706Z",
  //     budget: 29729,
  //     isActive: true
  //   },
  //   {
  //     id: 4,
  //     name: "Purdy, Keeling and Smitham",
  //     description:
  //       "Innovative 6th generation model. Perferendis libero qui iusto et ullam cum sint molestias vel.",
  //     imageUrl: "/assets/placeimg_500_300_arch5.jpg",
  //     contractTypeId: 4,
  //     contractSignedOn: "2013-05-26T01:10:42.344Z",
  //     budget: 45660,
  //     isActive: true
  //   },
  //   {
  //     id: 5,
  //     name: "Kreiger - Waelchi",
  //     description:
  //       "Managed logistical migration. Qui quod praesentium accusamus eos hic non error modi et.",
  //     imageUrl: "/assets/placeimg_500_300_arch12.jpg",
  //     contractTypeId: 2,
  //     contractSignedOn: "2009-12-18T21:46:47.944Z",
  //     budget: 81188,
  //     isActive: true
  //   },
  //   {
  //     id: 6,
  //     name: "Lesch - Waelchi",
  //     description:
  //       "Profound mobile project. Rem consequatur laborum explicabo sint odit et illo voluptas expedita.",
  //     imageUrl: "/assets/placeimg_500_300_arch1.jpg",
  //     contractTypeId: 3,
  //     contractSignedOn: "2016-09-23T21:27:25.035Z",
  //     budget: 53407,
  //     isActive: false
  //   }
  // ];
  // console.log("initialValues", initialValues);

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'arrayFieldName',
  //   // defaultValue: initialValues,  // default value directly not supported
  // });

  // useEffect(() => {
  //   if (abc.current) {
  //     console.log(counterRef.current,);

  //     abc.current = false;
  //     append(initialValues.map((e) => ({ ...e, id: counterRef.current++ })));
  //   }
  // }, []);
  // console.log("values", counterRef.current, fields.map((e) => ({ ...e, id : counterRef.current++})));
  // const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data: any = await projectAPI.get(currentPage);  //any
        setError('');
        currentPage === 1 ? setProjects(data) : setProjects((e) => [...e, ...data])
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [currentPage])

  const handleMoreClick = () => {
    setCurrentPage((cur) => cur + 1)
  }

  const saveProject = (project: Project) => {
    // let updatedProject = projects.map((p: Project) => {

    //   return p.id === project.id ? project : p;
    // });
    // setProjects(updatedProject);

    projectAPI.put(project)
      .then((updatedProject) => {
          let updatedProjects = projects.map((p: Project) => {
            return p.id === project.id ? new Project(updatedProject) : p;
          });
          setProjects(updatedProjects);
      })
      .catch((e) => {
        if(e instanceof Error) setError(e.message);
      })
  }

  return (
    <Fragment>
      <h1>Projects</h1>

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      {/* <pre>{JSON.stringify(initialValues, null, '')}</pre> */}
      {/* <pre>{JSON.stringify(MOCK_PROJECTS, null, '')}</pre> */}
      <ProjectList onSave={saveProject} projects={projects} />

      {!loading && !error && (
        <div className="row">
          <div className='col-sm-12'>
            <div className='button-group fluid'>
              <button onClick={handleMoreClick}>More...</button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className='center-page'>
          <span className='spinner primary' />
          <p>Loading...</p>
        </div>
      )
      }
    </Fragment>);
}

export default ProjectsPage;