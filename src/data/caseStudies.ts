export interface CaseStudy {
    id: string;
    title: string;
    summary: string;
    details: string;
  }
  
  const caseStudies: CaseStudy[] = [
    {
      id: 'case1',
      title: 'Manufacturing Efficiency Improvement',
      summary: 'Helped a manufacturing company increase efficiency by 35%',
      details: 'Through process optimization and lean manufacturing implementation, we helped reduce waste and improve production efficiency, resulting in significant cost savings.'
    },
    {
      id: 'case2',
      title: 'Retail Digital Transformation',
      summary: 'Led digital transformation for a retail chain',
      details: 'Implemented an omnichannel strategy and modernized operations, resulting in a 50% increase in online sales and improved customer satisfaction.'
    }
  ];
  
  export default caseStudies;