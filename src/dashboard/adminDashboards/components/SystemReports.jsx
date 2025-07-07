import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Avatar,
  useTheme,
} from "@mui/material";
import {
  BarChart as ChartIcon,
  People as PeopleIcon,
  Book as CourseIcon,
  Star as StarIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import AdminDialog from "./AdminDialog";

const SystemReports = ({ onExport, loading }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  const reports = [
    {
      id: 1,
      name: "User Activity Report",
      type: "Daily",
      generatedDate: "2025-06-15",
      downloads: 24,
    },
    {
      id: 2,
      name: "Course Popularity",
      type: "Monthly",
      generatedDate: "2025-06-01",
      downloads: 156,
    },
    {
      id: 3,
      name: "System Performance",
      type: "Weekly",
      generatedDate: "2025-06-08",
      downloads: 42,
    },
  ];

  const quickReports = [
    {
      icon: <PeopleIcon />,
      title: "User Growth Trends",
    },
    {
      icon: <CourseIcon />,
      title: "Top Enrolled Courses",
    },
    {
      icon: <StarIcon />,
      title: "Course Feedback Overview",
    },
    {
      icon: <SettingsIcon />,
      title: "Usage Statistics",
    },
  ];

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleExport = (reportType) => {
    onExport(reportType, "csv");
  };

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      {/* Reports Table */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 4,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 20px rgba(3,4,94,0.7)"
              : theme.shadows[4],
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ p: 3, color: theme.palette.text.primary }}
          >
            System Reports
          </Typography>

          <TableContainer>
            <Table>
              <TableHead
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(67,97,238,0.25)"
                      : theme.palette.action.hover,
                }}
              >
                <TableRow>
                  {["Report", "Type", "Generated", "Downloads", "Action"].map(
                    (label) => (
                      <TableCell
                        key={label}
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.text.secondary,
                          borderBottom:
                            theme.palette.mode === "dark"
                              ? "1px solid rgba(255,255,255,0.1)"
                              : undefined,
                        }}
                      >
                        {label}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow
                    key={report.id}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(67,97,238,0.15)"
                            : theme.palette.action.hover,
                      },
                    }}
                  >
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {report.name}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {report.type}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {report.generatedDate}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {report.downloads}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<ChartIcon />}
                        onClick={() =>
                          handleExport(report.name.toLowerCase().replace(/ /g, "_"))
                        }
                        sx={{
                          borderRadius: "20px",
                          textTransform: "none",
                          color: theme.palette.primary.main,
                          borderColor: theme.palette.primary.main,
                          "&:hover": {
                            backgroundColor: theme.palette.primary.light,
                            borderColor: theme.palette.primary.light,
                            color: "#fff",
                          },
                        }}
                        disabled={loading}
                      >
                        Export Report
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Quick Access Reports */}
      <Card
        sx={{
          borderRadius: 4,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 20px rgba(3,4,94,0.7)"
              : theme.shadows[4],
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ p: 3, color: theme.palette.text.primary }}
          >
            Quick Access Reports
          </Typography>

          <TableContainer>
            <Table>
              <TableHead
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(67,97,238,0.25)"
                      : theme.palette.action.hover,
                }}
              >
                <TableRow>
                  {["", "Report Type"].map((label) => (
                    <TableCell
                      key={label}
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.text.secondary,
                        borderBottom:
                          theme.palette.mode === "dark"
                            ? "1px solid rgba(255,255,255,0.1)"
                            : undefined,
                      }}
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {quickReports.map((item, idx) => (
                  <TableRow
                    key={idx}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(67,97,238,0.15)"
                            : theme.palette.action.hover,
                      },
                    }}
                  >
                    <TableCell>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {item.icon}
                      </Avatar>
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {item.title}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            fullWidth
            onClick={handleDialogOpen}
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 0,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              color: "#fff",
              "&:hover": {
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              },
            }}
            startIcon={<AddIcon />}
          >
            Generate Custom Report
          </Button>
        </CardContent>
      </Card>

      <AdminDialog open={openDialog} onClose={handleDialogClose} dialogType="customReport" />
    </Box>
  );
};

export default SystemReports;
