import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
} from "@mui/material";
import {
  MonitorHeart as HealthIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import AdminDialog from "./AdminDialog";

const SystemHealth = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  // Mock data - سيتم استبدالها ببيانات حقيقية من API
  const [systemHealth, setSystemHealth] = useState([
    {
      id: 1,
      component: "Database",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "None",
    },
    {
      id: 2,
      component: "API Server",
      status: "operational",
      uptime: "99.95%",
      lastIncident: "2025-05-15 (10 min downtime)",
    },
    {
      id: 3,
      component: "File Storage",
      status: "degraded",
      uptime: "99.8%",
      lastIncident: "2025-06-12 (Slow response)",
    },
    {
      id: 4,
      component: "Authentication",
      status: "operational",
      uptime: "100%",
      lastIncident: "None",
    },
  ]);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "operational":
        return theme.palette.success.main;
      case "degraded":
        return theme.palette.warning.main;
      case "down":
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          color={theme.palette.mode === "dark" ? "grey.100" : "text.primary"}
        >
          System Health
        </Typography>
        <Button
          variant="contained"
          startIcon={<SettingsIcon />}
          onClick={handleDialogOpen}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            color: "#fff",
            px: 3,
            py: 1.5,
            borderRadius: "30px",
            fontWeight: "bold",
            boxShadow: theme.palette.mode === "dark" 
              ? "0 4px 15px rgba(102, 126, 234, 0.7)"
              : "0 4px 15px rgba(118, 75, 162, 0.5)",
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: theme.palette.mode === "dark" 
                ? "0 6px 20px rgba(102, 126, 234, 0.9)"
                : "0 6px 20px rgba(118, 75, 162, 0.7)",
            },
          }}
        >
          System Settings
        </Button>
      </Box>

      <Card 
        sx={{ 
          borderRadius: 4, 
          boxShadow: theme.shadows[4], 
          backgroundColor: theme.palette.mode === "dark" ? "#292C3A" : "#fff",
          color: theme.palette.mode === "dark" ? "grey.100" : "text.primary",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead 
                sx={{ backgroundColor: theme.palette.mode === "dark" ? theme.palette.action.selected : theme.palette.action.hover }}
              >
                <TableRow>
                  {["Component", "Status", "Uptime", "Last Incident", "Actions"].map((label) => (
                    <TableCell 
                      key={label} 
                      sx={{ 
                        fontWeight: "bold",
                        color: theme.palette.mode === "dark" ? "grey.100" : "text.primary",
                        borderBottom: theme.palette.mode === "dark" ? "1px solid rgba(255,255,255,0.15)" : "none",
                      }}
                    >
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {systemHealth.map((comp) => (
                  <TableRow 
                    key={comp.id} 
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: theme.palette.mode === "dark" 
                          ? theme.palette.action.hover 
                          : theme.palette.action.selected,
                      },
                      color: theme.palette.mode === "dark" ? "grey.200" : "text.primary"
                    }}
                  >
                    <TableCell>{comp.component}</TableCell>
                    <TableCell>
                      <Chip
                        label={comp.status}
                        sx={{
                          backgroundColor: getStatusColor(comp.status),
                          color: "#fff",
                          textTransform: "capitalize",
                        }}
                      />
                    </TableCell>
                    <TableCell>{comp.uptime}</TableCell>
                    <TableCell>{comp.lastIncident}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<HealthIcon />}
                        sx={{
                          borderRadius: "20px",
                          textTransform: "none",
                          color: theme.palette.mode === "dark" ? "grey.100" : "inherit",
                          borderColor: theme.palette.mode === "dark" ? "grey.700" : undefined,
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        View Logs
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <AdminDialog open={openDialog} onClose={handleDialogClose} dialogType="systemSettings" />
    </Box>
  );
};

export default SystemHealth;
