const renderModal = () => {
    if (!authenticated) {
      return <AuthModal open={open} setOpen={setOpen} />;
    }
    return (
      <Modal open={open} setOpen={setOpen} width="4xl">
        <CreateReviewForm setOpen={setOpen} setSuccess={setSuccess} initValues={initValues} />
      </Modal>
    );
};

//import { LoginForm } from '../auth/LoginForm';
//import { SignupForm } from '../auth/SignupForm';

// if (!authenticated) {
    //   return <AuthModal open={open} setOpen={setOpen} />;
    // }

    import { AuthModal } from '../auth/AuthModal';