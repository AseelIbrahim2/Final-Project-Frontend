

export const formatReportData = (data, reportType) => {
  if (!data) {
    return {
      labels: [],
      datasets: [],
    };
  }

  switch (reportType) {
    case 'user_activity':
      return {
        labels: data.labels || [],
        datasets: [
          {
            label: 'Active Users',
            data: data.activeUsers || [],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
          {
            label: 'New Signups',
            data: data.newSignups || [],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
        ],
      };
    case 'course_popularity':
      return {
        labels: data.labels || [],
        datasets: [
          {
            label: 'Enrollments',
            data: data.enrollments || [],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
          },
        ],
      };
    default:
      return data;
  }
};

export const downloadReport = (data, fileName) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};