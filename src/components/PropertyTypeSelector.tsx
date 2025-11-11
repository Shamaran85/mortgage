import { Box, Button, Grid, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";

export type PropertyType = "house" | "condo";

interface PropertyTypeSelectorProps {
  propertyType: PropertyType;
  setPropertyType: (value: PropertyType) => void;
}

const PropertyTypeSelector = ({
  propertyType,
  setPropertyType,
}: PropertyTypeSelectorProps) => {
  const propertyTypes = [
    {
      type: "house" as const,
      label: "Hus",
      icon: <HomeIcon sx={{ fontSize: 32 }} />,
      ariaLabel: "Hus",
    },
    {
      type: "condo" as const,
      label: "Bostadsrätt",
      icon: <ApartmentIcon sx={{ fontSize: 32 }} />,
      ariaLabel: "Bostadsrätt",
    },
  ];

  const buttonStyles = {
    display: "flex",
    flexDirection: "column",
    py: 1,
    minHeight: 56,
    textTransform: "none" as const,
    fontWeight: 600,
    borderRadius: 2,
    "&:focus": {
      outline: "none",
    },
  };

  return (
    <Grid container spacing={1} pb={2}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Välj typ av boende
        </Typography>
      </Grid>
      {propertyTypes.map(({ type, label, icon, ariaLabel }, index) => (
        <Grid key={type} size={{ xs: 6 }}>
          <Box {...(index === 0 ? { pr: 0.5 } : { pl: 0.5 })}>
            <Button
              fullWidth
              onClick={() => setPropertyType(type)}
              variant={propertyType === type ? "contained" : "outlined"}
              sx={buttonStyles}
              aria-label={ariaLabel}
            >
              {icon}
              {label}
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PropertyTypeSelector;
