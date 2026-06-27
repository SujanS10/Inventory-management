import { useEffect } from "react";
import Quagga from "quagga";

function BarcodeScanner({ onDetected }) {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: document.querySelector("#scanner"),
        },

        decoder: {
          readers: [
            "ean_reader",
            "code_128_reader",
          ],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }

        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      const barcode = result.codeResult.code;

      console.log("SCANNED BARCODE:", barcode);

      onDetected(barcode);

      Quagga.stop();
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div
      id="scanner"
      style={{
        width: "500px",
        height: "300px",
      }}
    />
  );
}

export default BarcodeScanner;