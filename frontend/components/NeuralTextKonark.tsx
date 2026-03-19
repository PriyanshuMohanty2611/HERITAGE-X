import React from 'react';

export const NeuralText_Konark = () => {
  const cipher = `
Konark_Arka_Matrix_Ref_33010 | Geometry.Sundial.Precision = 99.992%
Physics.Khondalite_Rock.Density = 2.65 g/cm³ | Architectural.Kalinga.rekha_deulas
Sovereign.Initialize.Neural_Scan | Vector_B4.Structural_Anomaly.Alert | 13thCent_Chariot_Temple
Cultural_Apex.Nata_Mandir.Glow | Voxel.Mesh.Render | [PROTOCOL.Active] | 24_Wheels_Sundial.Matrix
Archaeology.Verified.OdishaTourism | Engineering.Feat.3D.Scan | [DEEP.Link.Active]
  `.repeat(20); // Repeat even more to ensure full coverage

  return (
    <div className="absolute inset-0 p-10 font-mono text-[10px] font-black leading-relaxed text-blue-900 tracking-tight opacity-30 z-[-1] pointer-events-none whitespace-pre select-none">
      {cipher}
    </div>
  );
};
