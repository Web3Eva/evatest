import React, { useState } from 'react';
import { WalletDialogContext } from './useWalletDialog.mjs';
import { WalletDialog } from './WalletDialog.mjs';
export const WalletDialogProvider = ({ children, ...props }) => {
    const [open, setOpen] = useState(false);
    return (React.createElement(WalletDialogContext.Provider, { value: {
            open,
            setOpen,
        } },
        children,
        React.createElement(WalletDialog, { ...props })));
};
//# sourceMappingURL=WalletDialogProvider.js.map