import { PDFViewer, Page, Text, Document, StyleSheet, Image } from '@react-pdf/renderer';
import qr_polleria from '../assets/qr_polleria.png';

const ComprobantePDF = ({ comprobanteSeleccionado }) => {

  return (
    <PDFViewer style={{ width: '100%', height: '85vh' }}>
      <Document>
        <Page style={styles.page}>
          <div className='comprobante'>
            <div className='campo_info'>
              <div className='imagen_com'>
                <Image src={qr_polleria} style={styles.qrImage} />
              </div>
              <div className='info'>
                <Text style={styles.comprobanteTitle}>LO DE JUAN INVERSIONES S.R.L. POLLERIA LO DE JUAN</Text>
                <Text style={styles.direccion}>GRUPO RESIDENCIAL  27A MZA. I LOTE. 21 SEC. 3 LIMA - LIMA - VILLA EL SALVADOR RUC:20563254174</Text>
                <Text style={styles.comproElect}>COMPROBANTE ELECTRONICO</Text>
                <Text style={styles.numCom}>N° <Text>{comprobanteSeleccionado ? comprobanteSeleccionado.comprobante_id : "--"}</Text></Text>
              </div>
            </div>
            <div className='campo_info_cliente'>
              <div className='datos_cliente' style={styles.datos_cliente}>
                <Text >FECHA EMISION: <Text>{comprobanteSeleccionado ? new Date(comprobanteSeleccionado.fechaEmision).toLocaleDateString() : "--"}</Text></Text>
                <Text>DNI: <Text>{comprobanteSeleccionado ? comprobanteSeleccionado.dni : "--"}</Text></Text>
                <Text>NOMBRE: <Text>{comprobanteSeleccionado ? comprobanteSeleccionado.cliente : "--"}</Text></Text>
              </div>
              <div className='datos_total' style={styles.campoTotal}>
                <Text>--------------------------------------------------------------------------------</Text>
                <Text style={styles.campoTotalResult}>TOTAL S/ <Text>{comprobanteSeleccionado ? comprobanteSeleccionado.total : "--"}</Text></Text>
                <Text>--------------------------------------------------------------------------------</Text>
              </div>
              <div className='datos_final' style={styles.datosfinal}>
                <Text>Representación del Comprobante Electronico</Text>   
                <Text>www.jsjfact.com/facturador/cpe/lodejuan</Text> 
              </div>
            </div>
          </div>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },

  comprobanteTitle: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    fontWeight: 'bold',
  },

  qrImage: {
    width: '200px', // Ajusta el tamaño como necesites
    height: '200px', // Ajusta el tamaño como necesites
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },

  direccion:{
    fontSize: 20,
    marginLeft: 40,
    marginRight: 40,
    textAlign: 'center',
  },

  comproElect:{
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'demibold',
  },

  datos_cliente:{
    marginTop: 30,
    marginLeft: 40,
    marginRight: 40,
  },

  campoTotal:{
    marginTop: 15,
    marginLeft: 40,
    marginRight: 40,
  },

  campoTotalResult:{
    textAlign: 'right',
    marginRight: 20,
  },

  datosfinal:{
    marginTop: 50,
    marginLeft: 40,
    marginRight: 40,
    textAlign: 'center',
    fontSize: 16,
  },

  numCom:{
    textAlign:'center',
    fontWeight: 'bold',
  }
  
  // Define más estilos aquí si es necesario
});

export default ComprobantePDF;