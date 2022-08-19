import {Picker} from "antd-mobile";


export default function Index({visible, setVisible, columns, onConfirm: confirm}) {
    return (<Picker
            visible={visible}
            onClose={() => {
                setVisible(false)
            }}
            columns={[columns]}
            onConfirm={(e) => {
                confirm(e)
            }}


        />
    );
}