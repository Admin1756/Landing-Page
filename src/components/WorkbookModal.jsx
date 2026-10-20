import Modal from "./Modal";
import WorkbookForm from "./WorkbookForm";

export default function WorkbookModal({ source, initial, onClose }) {
  return (
    <Modal onClose={onClose} labelId="wb-modal-title">
      <div className="zz-dialog-body">
        <h2 id="wb-modal-title" className="zz-dialog-title">Get The Halal Investor's Workbook, free</h2>
        <p className="zz-dialog-sub">58 pages of worksheets to screen stocks, purify income and build a Shariah-compliant portfolio for India.</p>
        <WorkbookForm idPrefix="wbm" source={source} initial={initial} fireOnMount onDone={(x) => x === "close" && onClose()} />
      </div>
    </Modal>
  );
}
